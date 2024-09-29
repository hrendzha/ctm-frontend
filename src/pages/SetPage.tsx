import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
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
import { Controller, useForm } from "react-hook-form";
import { availableTermLevels } from "constants-local/availableTermLevels";
import { ICardsListFilter } from "interfaces/CardsListFilter.interface";

const skeletons = Array(20).fill(null);

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];

const formDefaultValues = {
  searchQuery: "",
  level: -1,
  sort: "createDesc",
};

const SetPage = () => {
  const [terms, setTerms] = useState<ITerm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[1]);
  const [drawerOpenProp, setDrawerOpenProp] = useState(false);
  const isFirstRender = useFirstRender();

  const { register, handleSubmit, reset, control, getValues } = useForm<ICardsListFilter>({
    defaultValues: formDefaultValues,
  });

  const onFilterSubmit = handleSubmit(() => {
    setDrawerOpenProp(false);
    if (page === 0) {
      getTerms();
    } else {
      setPage(0);
    }
  });

  const onSortChange = () => {
    if (page === 0) {
      getTerms();
    } else {
      setPage(0);
    }
  };

  const onResetForm = () => reset();

  const onPageChange = async (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(Number(event.target.value));
    setPage(0);
  };

  const getTerms = async () => {
    try {
      const formData = getValues();

      const data = await api.terms.get({
        page: page,
        perPage: itemsPerPage,
        sort: formData.sort,
        searchQuery: formData.searchQuery,
        level: formData.level === -1 ? undefined : formData.level,
      });

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

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpenProp(newOpen);
  };

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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexWrap={"wrap"}
            >
              <Box display="flex" alignItems="center" gap={2} flexWrap={"wrap"}>
                <Tooltip title="Filter">
                  <IconButton aria-label="filter" onClick={toggleDrawer(true)}>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="sort">Sort by</InputLabel>
                  <Controller
                    name="sort"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="sort"
                        label="Sort by"
                        {...field}
                        onChange={e => {
                          field.onChange(e);
                          onSortChange();
                        }}
                      >
                        <MenuItem value="createAsc">Create Date: Ascending</MenuItem>
                        <MenuItem value="createDesc" selected>
                          Create Date: Descending
                        </MenuItem>
                        <MenuItem value="lvlChangeAsc">Level Change Date: Ascending</MenuItem>
                        <MenuItem value="lvlChangeDesc">Level Change Date: Descending</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>

              <Drawer anchor="right" open={drawerOpenProp} onClose={toggleDrawer(false)}>
                <Stack
                  component="form"
                  noValidate
                  autoComplete="off"
                  onSubmit={onFilterSubmit}
                  spacing={2}
                  sx={{ p: 2 }}
                >
                  <Typography variant="h6" component="div">
                    Filter
                  </Typography>

                  <TextField
                    fullWidth
                    label="Term or definition"
                    {...register("searchQuery", {
                      setValueAs: (value: string) => value.trim(),
                    })}
                  />

                  <FormControl fullWidth>
                    <InputLabel id="filter-level">Level</InputLabel>
                    <Controller
                      name="level"
                      control={control}
                      render={({ field }) => (
                        <Select labelId="filter-level" label="Level" {...field}>
                          <MenuItem value={-1}>any</MenuItem>
                          {availableTermLevels.map(i => (
                            <MenuItem key={i} value={i}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>

                  <Button type="submit" fullWidth variant="contained">
                    Search
                  </Button>
                  <Button type="button" fullWidth variant="outlined" onClick={onResetForm}>
                    Reset
                  </Button>
                </Stack>
              </Drawer>

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
