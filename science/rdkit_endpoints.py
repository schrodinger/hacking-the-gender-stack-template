from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem.Draw import rdMolDraw2D
from rdkit.Chem import QED

import enum
import itertools

MOL_PROP_MOL_TITLE = "title"
ATOM_PROP_ATOM_LABEL = "atomLabel"

def _get_mol_type(mol):
    for at in mol.GetAtoms():
        if at.GetAtomicNum() == 0:
            if at.HasProp(ATOM_PROP_ATOM_LABEL) and at.GetProp(ATOM_PROP_ATOM_LABEL).startswith("R"):
                return "RGroup"
            else:
                return "Core"
    return "Mol"

def smiles_to_mol(smiles, title = None):
    mol = Chem.MolFromSmiles(smiles)
    if title:
        mol.SetProp(MOL_PROP_MOL_TITLE, title)
    else:
        mol_type = _get_mol_type(mol)
        mol.SetProp(MOL_PROP_MOL_TITLE, mol_type)
    return mol


def generate_image(mol, width=400, height=400):
    drawer = rdMolDraw2D.MolDraw2DSVG(width,height)
    drawer.DrawMolecule(mol)
    drawer.FinishDrawing()
    return SVG(drawer.GetDrawingText().encode())

def _get_rgroup_labels(scaff):
    core_rlabels = []
    for at in scaff.GetAtoms():
        if at.HasProp(ATOM_PROP_ATOM_LABEL):
            core_rlabels.append(at.GetProp(ATOM_PROP_ATOM_LABEL))
    return sorted(core_rlabels)


def _remove_rgroup_atoms(core):
    product = Chem.RWMol(core)
    remove = []
    for at in product.GetAtoms():
        if at.HasProp(ATOM_PROP_ATOM_LABEL):
            remove.append(at.GetIdx())
            
    product.BeginBatchEdit()
    for at_idx in remove:
        product.RemoveAtom(at_idx)
    product.CommitBatchEdit()
    return product

def _combine_core_and_rgroups(core, rgroups):
    rgroup_names = rgroups.keys()
    product = Chem.RWMol(core)
    for at in core.GetAtoms():
        if at.HasProp(ATOM_PROP_ATOM_LABEL):
            label = at.GetProp(ATOM_PROP_ATOM_LABEL)
            if label not in rgroup_names:
                continue
            
            # find where the rgroup will attach to the existing
            # product
            attach_idx = None
            remove_idx = None
            rgroup = Chem.RWMol(rgroups[label])
            for rg_at in rgroup.GetAtoms():
                if rg_at.GetAtomicNum() == 0:
                    attach_idx = rg_at.GetNeighbors()[0].GetIdx()
                    if rg_at.GetIdx() < attach_idx:
                        # attach_idx will go down by 1
                        attach_idx -= 1
                    rgroup.RemoveAtom(rg_at.GetIdx())
                    break
            if attach_idx is None:
                raise ValueError("Invalid rgroup provided")
            
            prev_atom_count = product.GetNumAtoms()
            product = Chem.RWMol(Chem.CombineMols(product, rgroup))
            product.AddBond(at.GetNeighbors()[0].GetIdx(), attach_idx + prev_atom_count)

    return _remove_rgroup_atoms(product)


def rgroup_enumerate(core, rgroups):
    """
    :param core: scaffold with dummy atom rgroups
    :param rgroups: dict of rgroup num -> list of possible rgroups
    
    For example,
    
    rgroups = {
        "R1" = [rg1a, rg1b, ...],
        "R2" = [rg2a, rg2b, ...]
    }
    """
    all_products = []
    for possible_combo in itertools.product(*rgroups.values()):
        rgroup_dict = {rg.GetProp(MOL_PROP_MOL_TITLE) : rg for rg in possible_combo}
        all_products.append(_combine_core_and_rgroups(Chem.Mol(core), rgroup_dict))
    return all_products


def get_QED_props(products):
    data = dict()
    prop_names = ["MW", "ALOGP", "HBA", "HBD", "PSA", "ROTB", "AROM", "ALERTS"]
    column_names = ["Image", "MW", "ALOGP", "HBA", "HBD", "PSA", "ROTB", "AROM", "ALERTS", "QED"]
    for idx, p in enumerate(products):
        lst = [p]
        props = QED.properties(p)
        for prop in prop_names:
            a = float(props.__getattribute__(prop))
            lst.append(a)
        lst.append(round(QED.qed(p),3))
        data[f"Product {idx+1}"] = lst
    return data, column_names

