import { useEffect, useState } from "react";
import { List, ListItem, Skeleton } from "@mui/material";
import { api } from "api";
import { ITerm } from "interfaces";
import { Section } from "components/Section";
import { AppContainer } from "components/AppContainer";
import { AddTermDialog } from "components/AddTermDialog";
import { AppSpeedDial } from "components/AppSpeedDial";
import { SetList } from "components/SetList";
import { lockScroll } from "utils";

const skeletons = Array(20).fill(null);

const SetPage = () => {
  const [terms, setTerms] = useState<ITerm[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const getTerms = async () => {
    try {
      const terms = await api.terms.get();
      setTerms(terms);
    } catch (error) {
      console.log("catch", error);
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
          <SetList
            terms={terms}
            onRemoveCallback={onRemoveCallback}
            onEditCallback={onEditCallback}
          />
        )}
      </AppContainer>
    </Section>
  );
};

export { SetPage };
