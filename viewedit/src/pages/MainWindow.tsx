import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  List,
  ListItemButton,
} from "@mui/material";

interface MainWindowProps {
  data: { title: string; bodyText: string }[];
}

const MainWindow: React.FC<MainWindowProps> = ({ data }) => {
  const [selectedPage, setSelectedPage] = useState(data[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(selectedPage);

  const handleEditToggle = () => {
    if (isEditing) {
      selectedPage.title = editedData.title;
      selectedPage.bodyText = editedData.bodyText;
    }
    setIsEditing(!isEditing);
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      {/* Sidebar */}
      <Grid
        item
        xs={3}
        style={{
          height: "100%",
          borderRight: "1px solid grey",
          overflowY: "auto",
        }}
      >
        <List>
          {data.map((page, index) => (
            <ListItemButton
              key={index}
              selected={page.title === selectedPage.title}
              onClick={() => {
                setSelectedPage(page);
                setEditedData(page);
                setIsEditing(false);
              }}
            >
              {page.title}
            </ListItemButton>
          ))}
        </List>
      </Grid>

      {/* Main Content */}
      <Grid
        item
        xs={9}
        style={{ height: "100%", overflowY: "auto", padding: "16px" }}
      >
        <Box
          p={2}
          border={1}
          borderColor="grey.300"
          borderRadius={2}
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {isEditing ? (
            <>
              <TextField
                fullWidth
                variant="outlined"
                label="Title"
                value={editedData.title}
                onChange={(e) =>
                  setEditedData({ ...editedData, title: e.target.value })
                }
                style={{ marginBottom: "16px" }}
              />
              <TextField
                fullWidth
                multiline
                rows={10}
                variant="outlined"
                label="Body"
                value={editedData.bodyText}
                onChange={(e) =>
                  setEditedData({ ...editedData, bodyText: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <Typography variant="h6">{selectedPage.title}</Typography>
              <Typography>{selectedPage.bodyText}</Typography>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditToggle}
            style={{ marginTop: "16px" }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainWindow;
