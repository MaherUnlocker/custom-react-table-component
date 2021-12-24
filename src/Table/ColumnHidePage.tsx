import {
  Checkbox,
  FormControlLabel,
  Typography,
  createStyles,
  makeStyles,
  Popover
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { TableInstance } from "react-table";

const useStyles = makeStyles(
  createStyles({
    columnsPopOver: {
      padding: 24
    },
    popoverTitle: {
      fontWeight: 500,
      padding: "0 24px 24px 0",
      textTransform: "uppercase"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 198px)",
      "@media (max-width: 600px)": {
        gridTemplateColumns: "repeat(1, 160px)"
      },
      gridColumnGap: 6,
      gridRowGap: 6
    }
  })
);

type ColumnHidePageProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  anchorEl?: Element;
  onClose: () => void;
  show: boolean;
};

export function ColumnHidePage<T extends Record<string, unknown>>({
  instance,
  anchorEl,
  onClose,
  show
}: ColumnHidePageProps<T>): ReactElement | null {
  const classes = useStyles({});
  const { allColumns, toggleHideColumn } = instance;
  const hideableColumns = allColumns.filter(
    (column) => !(column.id === "_selector")
  );
  const checkedCount = hideableColumns.reduce(
    (acc, val) => acc + (val.isVisible ? 0 : 1),
    0
  );

  const onlyOneOptionLeft = checkedCount + 1 >= hideableColumns.length;

  return hideableColumns.length > 1 ? (
    <div>
      <Popover
        anchorEl={anchorEl}
        style={{ padding: 24 }}
        onClose={onClose}
        open={show}
      >
        <div className={classes.columnsPopOver}>
          <Typography className={classes.popoverTitle}>
            Visible Columns
          </Typography>
          <div>
            {hideableColumns.map((column) => (
              <FormControlLabel
                key={column.id}
                control={
                  <Checkbox
                    value={`${column.id}`}
                    disabled={column.isVisible && onlyOneOptionLeft}
                  />
                }
                label={column.render("Header")}
                checked={column.isVisible}
                onChange={() => toggleHideColumn(column.id, column.isVisible)}
              />
            ))}
          </div>
        </div>
      </Popover>
    </div>
  ) : null;
}
