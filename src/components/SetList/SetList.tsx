import { List } from "@mui/material";
import { SetListItem } from "components/SetListItem";
import { ITerm } from "interfaces";

interface IProps {
  terms: ITerm[];
  onRemoveCallback: (_id: string) => void;
  onEditCallback: (updatedTerm: ITerm) => void;
}

const SetList = ({ terms, onRemoveCallback, onEditCallback }: IProps) => {
  return (
    <List disablePadding>
      {terms.map(term => (
        <SetListItem
          key={term._id}
          term={term}
          onRemoveCallback={onRemoveCallback}
          onEditCallback={onEditCallback}
        />
      ))}
    </List>
  );
};

export { SetList };
