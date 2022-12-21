import { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Section } from "components/Section";
import { api } from "api";
import { ITerm } from "interfaces";
import { AddTermDialog } from "components/AddTermDialog";
import { TermForUpdate } from "types";

const defaultTermForUpdate: TermForUpdate = {
  _id: "",
  term: "",
  definition: "",
};

const SetPage = () => {
  const [terms, setTerms] = useState<ITerm[]>([]);
  const [termForUpdate, setTermForUpdate] = useState(defaultTermForUpdate);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const getTerms = async () => {
    try {
      const terms = await api.terms.get();
      setTerms(terms);
    } catch (error) {}
  };

  const onTermRemove = async (_id: string) => {
    try {
      setIsRemoving(true);
      await api.terms.remove(_id);
      getTerms();
    } catch (error) {
      console.log(error);
    } finally {
      setIsRemoving(false);
    }
  };

  const closeDialog = () => {
    setTermForUpdate(defaultTermForUpdate);
    setOpenDialog(false);
  };

  useEffect(() => {
    const getTermsOnMount = async () => {
      try {
        setIsLoading(true);
        await getTerms();
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getTermsOnMount();
  }, []);

  return (
    <Section>
      <Container maxWidth="lg">
        {isLoading ? (
          "loading"
        ) : (
          <>
            <Box>
              <Button variant="contained" onClick={() => setOpenDialog(true)}>
                Add term
              </Button>
            </Box>
            <AddTermDialog
              open={openDialog}
              onClose={closeDialog}
              onSave={() => {
                closeDialog();
                getTerms();
              }}
              termForUpdate={termForUpdate}
            />

            <List>
              {terms.map(({ term, definition, _id }) => (
                <ListItem key={_id}>
                  <Card
                    sx={{
                      display: {
                        sm: "flex",
                      },
                      flexDirection: {
                        sm: "row-reverse",
                      },
                      width: "100%",
                    }}
                  >
                    <CardActions sx={{ justifyContent: "end" }}>
                      <Tooltip title="Remove">
                        <IconButton
                          aria-label="remove term"
                          onClick={() => onTermRemove(_id)}
                          disabled={isRemoving}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="edit term"
                          size="small"
                          onClick={() => {
                            setTermForUpdate({
                              _id,
                              term,
                              definition,
                            });
                            setOpenDialog(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </CardActions>

                    <CardContent
                      sx={{
                        display: {
                          sm: "flex",
                        },
                        flexGrow: {
                          sm: 1,
                        },
                        paddingTop: {
                          xs: "5px",
                        },
                        padding: {
                          sm: "16px",
                        },
                        "&:last-child": {
                          paddingBottom: {
                            sm: "16px",
                          },
                        },
                      }}
                    >
                      <Typography
                        whiteSpace={"pre-wrap"}
                        sx={{
                          width: {
                            sm: 130,
                          },
                          mb: {
                            xs: 2,
                            sm: 0,
                          },
                        }}
                      >
                        {term}
                      </Typography>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                          mx: {
                            sm: 2,
                          },
                        }}
                      />
                      <Typography whiteSpace={"pre-wrap"}>{definition}</Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Container>
    </Section>
  );
};

export { SetPage };
