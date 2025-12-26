import { IconButton } from "@mui/material";
import React, { useState } from "react";
import NewStoryFormClassic from "./NewStoryFormClassic.tsx";
import NewStoryFormAi from "./NewStoryFormAi.tsx";
import { FormTypeButtons } from "./NewStoryForm.styles.ts";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  seq: number;
};

function NewStoryForm({ seq, setShowForm }: Props) {
  const [ai, setAi] = useState(true);

  return (
    <>
      <FormTypeButtons>
        <IconButton
          onClick={() => setAi(true)}
          sx={{
            width: 20,
            height: 20,
            padding: 0,
          }}
        >
          <AutoAwesomeOutlinedIcon color={ai ? "primary" : "action"} />
        </IconButton>
        <IconButton
          onClick={() => setAi(false)}
          sx={{
            width: 20,
            height: 20,
            padding: 0,
          }}
        >
          <EditNoteOutlinedIcon color={ai ? "action" : "primary"} />
        </IconButton>
      </FormTypeButtons>
      {ai ? (
        <NewStoryFormAi seq={seq} setShowForm={setShowForm} />
      ) : (
        <NewStoryFormClassic seq={seq} setShowForm={setShowForm} />
      )}
    </>
  );
}

export default NewStoryForm;
