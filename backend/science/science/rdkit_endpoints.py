from rdkit import Chem
from rdkit.Chem.Draw import rdMolDraw2D
from typing import List

ATOM_PROP_ATOM_LABEL = "atomLabel"


def generate_image(mol_smi: str, width: int = 400, height: int = 400) -> str:
    """
    Generates an image of an rdkit mol represented by the given smiles.

    *THIS WILL BE GIVEN TO PARTICIPANTS*

    :param mol_smi: SMILES of mol to display
    :param width: width of the image
    :param height: height of the image
    :return: generated image as an SVG string
    """
    mol = Chem.MolFromSmiles(mol_smi)
    drawer = rdMolDraw2D.MolDraw2DSVG(width, height)
    drawer.DrawMolecule(mol)
    drawer.FinishDrawing()
    return drawer.GetDrawingText().encode()


def get_rgroup_labels(core_smi: str) -> List[str]:
    """
    Retrieves rlabels from core/scaffold (such as ["R1", "R2", "R3"]). Front
    end should use this when asking for R1s, R2s, etc

    :param core_smis: SMILES that represents core
    :return: List of R labels
    """
    core = Chem.MolFromSmiles(core_smi)
    core_rlabels = []
    for at in core.GetAtoms():
        if at.HasProp(ATOM_PROP_ATOM_LABEL):
            core_rlabels.append(at.GetProp(ATOM_PROP_ATOM_LABEL))
    return sorted(core_rlabels)
