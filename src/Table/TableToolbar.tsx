import {
  Button,
  IconButton,
  Theme,
  Toolbar,
  Tooltip,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import ViewColumnsIcon from '@material-ui/icons/ViewColumn';
import classnames from 'classnames';
import React, {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import { TableInstance } from 'react-table';

import { TableMouseEventHandler } from '../../types/react-table-config';
import { ColumnHidePage } from './ColumnHidePage';
import { FilterPage } from './FilterPage';
import GlobalFilter from './filters/Global-Filter';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftButtons: {},
    rightButtons: {},
    leftIcons: {
      '&:first-of-type': {
        marginLeft: -12,
      },
    },
    rightIcons: {
      padding: 12,
      marginTop: '-6px',
      width: 48,
      height: 48,
      '&:last-of-type': {
        marginRight: -12,
      },
    },
  })
);

type InstanceActionButton<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  icon?: JSX.Element;
  onClick: TableMouseEventHandler;
  enabled?: (instance: TableInstance<T>) => boolean;
  label: string;
  variant?: 'right' | 'left';
};

type ActionButton = {
  icon?: JSX.Element;
  onClick: MouseEventHandler;
  enabled?: boolean;
  label: string;
  variant?: 'right' | 'left';
};

export const InstanceLabeledActionButton = <T extends Record<string, unknown>>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
}: InstanceActionButton<T>): ReactElement => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick(instance)}
    disabled={!enabled(instance)}
  >
    {icon}
    {label}
  </Button>
);

export const LabeledActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
}: ActionButton): ReactElement => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    disabled={!enabled}
  >
    {icon}
    {label}
  </Button>
);

export const InstanceSmallIconActionButton = <
  T extends Record<string, unknown>
>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
  variant,
}: InstanceActionButton<T>): ReactElement => {
  const classes = useStyles({});
  return (
    <Tooltip title={label} aria-label={label}>
      <span>
        <IconButton
          className={classnames({
            [classes.rightIcons]: variant === 'right',
            [classes.leftIcons]: variant === 'left',
          })}
          onClick={onClick(instance)}
          disabled={!enabled(instance)}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export const SmallIconActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
  variant,
}: ActionButton): ReactElement => {
  const classes = useStyles({});
  return (
    <Tooltip title={label} aria-label={label}>
      <span>
        <IconButton
          className={classnames({
            [classes.rightIcons]: variant === 'right',
            [classes.leftIcons]: variant === 'left',
          })}
          onClick={onClick}
          disabled={!enabled}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

type TableToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  onAdd?: TableMouseEventHandler;
  onDelete?: TableMouseEventHandler;
  onEdit?: TableMouseEventHandler;
  showGlobalFilter?: boolean;
  showFilterbyColomn?: boolean;
  showColomnIcon?: boolean;
};

export function TableToolbar<T extends Record<string, unknown>>({
  instance,
  showGlobalFilter,
  showFilterbyColomn,
  showColomnIcon,
}: PropsWithChildren<TableToolbarProps<T>>): ReactElement | null {
  const { columns } = instance;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const hideableColumns = columns.filter(
    (column) => !(column.id === '_selector')
  );

  const handleColumnsClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget);
      setColumnsOpen(true);
    },
    [setAnchorEl, setColumnsOpen]
  );

  const handleFilterClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget);
      setFilterOpen(true);
    },
    [setAnchorEl, setFilterOpen]
  );

  const handleClose = useCallback(() => {
    setColumnsOpen(false);
    setFilterOpen(false);
    setAnchorEl(undefined);
  }, []);

  // toolbar with add, edit, delete, filter/search column select.

  return (
    <Toolbar
      className={
        !showGlobalFilter && !showFilterbyColomn && !showColomnIcon
          ? 'd-none'
          : classes.toolbar
      }
    >
      {showGlobalFilter ? (
        <GlobalFilter
          preGlobalFilteredRows={instance.preGlobalFilteredRows}
          setGlobalFilter={instance.setGlobalFilter}
          style={{ width: '80%' }}
        />
      ) : null}

      <div className={classes.rightButtons}>
        <ColumnHidePage<T>
          instance={instance}
          onClose={handleClose}
          show={columnsOpen}
          anchorEl={anchorEl}
        />

        <FilterPage<T>
          instance={instance}
          onClose={handleClose}
          show={filterOpen}
          anchorEl={anchorEl}
        />
        {showColomnIcon
          ? hideableColumns.length > 1 && (
              <SmallIconActionButton
                icon={<ViewColumnsIcon />}
                onClick={handleColumnsClick}
                label="Show / hide columns"
                variant="right"
              />
            )
          : null}
        {showFilterbyColomn ? (
          <SmallIconActionButton
            icon={<FilterListIcon />}
            onClick={handleFilterClick}
            label="Filter by columns"
            variant="right"
          />
        ) : null}
      </div>
    </Toolbar>
  );
}
