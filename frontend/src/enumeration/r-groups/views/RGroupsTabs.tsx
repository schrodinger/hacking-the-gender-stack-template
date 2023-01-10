import classnames from 'classnames/bind';
import { Tab, Tabs } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import type { QueryKey } from '@tanstack/react-query';

import SmilesDataProvider from '../../shared-views/SmilesDataProvider';
import SmilesGrid from '../../components/SmilesGrid';
import { fetchAllRGroups } from '../service';
import type { RGroup } from '../service';

import styles from './RGroupsTabs.module.scss';

const cx = classnames.bind(styles);

interface RGroupsTabsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Query key for the query to fetch all R-Groups
   */
  queryKey: QueryKey;
  /**
   * List of R-Group labels in a core
   */
  rgroupLabels: string[];
  /**
   * Callback triggered whenever an R-Group selection is changed.
   * Called with a dictionary with R-Group labels as keys and an array of the selected smiles for
   * that R-Group label as values.
   */
  onRGroupSelect: (rgroupsDict: Record<string, string[]>) => void;
}

function transformToSmilesDict(rgroupsDict: Record<string, RGroup[]>) {
  const smilesDict: Record<string, string[]> = {};
  Object.entries(rgroupsDict).forEach(([label, rgroups]) => {
    smilesDict[label] = rgroups.map((rgroup) => rgroup.smiles);
  });

  return smilesDict;
}

/**
 * Tabs displaying a grid of selectable R-Groups for each of the specified R-Group labels
 */
function RGroupsTabs(props: RGroupsTabsProps) {
  const { queryKey, rgroupLabels, onRGroupSelect, className, ...divProps } = props;

  const initialSelectionState = rgroupLabels.reduce(
    (dict, label) => ({ ...dict, [label]: [] }),
    {} as Record<string, RGroup[]>
  );
  const [selectedRGroups, setSelectedRGroups] = useState(initialSelectionState);
  const [activeTabLabel, setActiveTabLabel] = useState(rgroupLabels[0]!);

  const handleRGroupCardClick = useCallback(
    (label: string, rgroup: RGroup) => {
      setSelectedRGroups((rgroups) => {
        const isRGroupSelected = !!rgroups[label]!.find(({ id }) => rgroup.id === id);
        const newSelectedRGroups = isRGroupSelected
          ? rgroups[label]!.filter(({ id }) => rgroup.id !== id)
          : [...rgroups[label]!, rgroup];

        const newRGroups = { ...rgroups, [label]: newSelectedRGroups };

        onRGroupSelect(transformToSmilesDict(newRGroups));
        return newRGroups;
      });
    },
    [onRGroupSelect]
  );

  const rgroupTabs = useMemo(
    () =>
      rgroupLabels.map((label) => {
        const selectedRGroupsCount = selectedRGroups[label]!.length;
        const tabLabel = selectedRGroupsCount ? `${label} (${selectedRGroupsCount})` : label;

        return <Tab key={label} label={tabLabel} value={label} />;
      }),
    [rgroupLabels, selectedRGroups]
  );

  const rgroupTabPanels = useMemo(
    () =>
      rgroupLabels.map((label) => {
        const selectedRGroupIds = selectedRGroups[label]!.map((rgroup) => rgroup.id);

        return (
          <SmilesDataProvider key={label} queryOptions={{ queryKey, queryFn: fetchAllRGroups }}>
            {(rgroups) => (
              <SmilesGrid
                smilesList={rgroups}
                selectedSmiles={selectedRGroupIds}
                onSmilesClick={(clickedRGroup) => handleRGroupCardClick(label, clickedRGroup)}
              />
            )}
          </SmilesDataProvider>
        );
      }),
    [handleRGroupCardClick, queryKey, rgroupLabels, selectedRGroups]
  );

  const panelListStyles = {
    '--tab-panel-count': rgroupLabels.length,
    '--active-tab-index': rgroupLabels.findIndex((label) => label === activeTabLabel),
  } as CSSProperties;

  return (
    <div className={cx('rgroups-tabs-container', className)} {...divProps}>
      <Tabs value={activeTabLabel} onChange={(_, label: string) => setActiveTabLabel(label)}>
        {rgroupTabs}
      </Tabs>
      <div className={cx('tab-panels-container')}>
        <div className={cx('tab-panel-list')} style={panelListStyles}>
          {rgroupTabPanels}
        </div>
      </div>
    </div>
  );
}

export type { RGroupsTabsProps };
export default RGroupsTabs;
