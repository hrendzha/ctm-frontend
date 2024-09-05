import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Skeleton,
  TablePagination,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { api } from "api";
import { ITerm } from "interfaces";
import { Section } from "components/Section";
import { AppContainer } from "components/AppContainer";
import { AddTermDialog } from "components/AddTermDialog";
import { AppSpeedDial } from "components/AppSpeedDial";
import { SetList } from "components/SetList";
import { lockScroll } from "utils";
import { useFirstRender } from "hooks";

const skeletons = Array(20).fill(null);

const ITEMS_PER_PAGE_OPTIONS = [2, 10, 25, 50, 100];

const SetPage = () => {
  const [terms, setTerms] = useState<ITerm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setITemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const isFirstRender = useFirstRender();

  const onPageChange = async (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setITemsPerPage(Number(event.target.value));
    setPage(0);
  };

  const getTerms = async () => {
    try {
      const data = await api.terms.get(page, itemsPerPage);
      setTerms(data.items);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.log("catch", error);
      throw error;
    }
  };

  const onRemoveCallback = (_id: string) => {
    setTerms(terms => terms.filter(term => term._id !== _id));
  };

  const onEditCallback = async (updatedTerm: ITerm) => {
    setTerms(terms => {
      const idx = terms.findIndex(term => term._id === updatedTerm._id);

      if (idx !== -1) {
        const copiedTerms = [...terms];
        copiedTerms.splice(idx, 1, updatedTerm);

        return copiedTerms;
      }

      return terms;
    });
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    lockScroll(isLoading);
  });

  useEffect(() => {
    if (isFirstRender) return;
    getTerms();
  }, [page, itemsPerPage]);

  useEffect(() => {
    const getTermsOnMount = async () => {
      try {
        setIsLoading(true);
        await getTerms();
      } catch (error) {
        console.log("catch", error);
      } finally {
        setIsLoading(false);
      }
    };

    getTermsOnMount();
  }, []);

  return (
    <Section pb={7}>
      <AppSpeedDial onAddTermClick={handleOpenDialog} />
      <AddTermDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={() => {
          handleCloseDialog();
          getTerms();
        }}
      />

      <AppContainer>
        {isLoading ? (
          <List disablePadding>
            {skeletons.map((_, idx) => (
              <ListItem key={idx} disableGutters>
                <Skeleton variant="rounded" height={150} width="100%" />
              </ListItem>
            ))}
          </List>
        ) : (
          <>
            <Box display="none" alignItems="center" justifyContent="space-between">
              <Tooltip title="Filter">
                <IconButton aria-label="filter" onClick={() => {}}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>

              <Drawer anchor="right">list</Drawer>

              <TablePagination
                rowsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
                component="div"
                count={totalItems}
                rowsPerPage={itemsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onChangeRowsPerPage}
              />
            </Box>

            <SetList
              terms={terms}
              onRemoveCallback={onRemoveCallback}
              onEditCallback={onEditCallback}
            />
          </>
        )}
      </AppContainer>
    </Section>
  );
};

export { SetPage };
