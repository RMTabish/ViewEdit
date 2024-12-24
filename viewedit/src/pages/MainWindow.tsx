import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Grid, Box, Button, TextField, Typography, List, ListItemButton } from "@mui/material";

interface MainWindowProps {
  data: { title: string; bodyText: string }[];
}

const MainWindow: React.FC<MainWindowProps> = ({ data }) => {
  const [selectedPage, setSelectedPage] = useState(data[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBodyText, setEditedBodyText] = useState(selectedPage.bodyText);

  const handleEditToggle = () => {
    if (isEditing) {
      selectedPage.bodyText = editedBodyText;
    }
    setIsEditing(!isEditing);
  };

  return (
    <Grid container sx={{ height: "100vh", width: "100vw" }}>
      {/* Sidebar */}
      <Grid
        item
        xs={3}
        sx={{
          backgroundColor: "grey.100",
          height: "100%",
          overflowY: "auto",
          borderRight: "1px solid #ddd",
          padding: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Menu
        </Typography>
        <List>
          {data.map((page, index) => (
            <ListItemButton
              key={index}
              selected={page.title === selectedPage.title}
              onClick={() => {
                setSelectedPage(page);
                setEditedBodyText(page.bodyText);
                setIsEditing(false);
              }}
              sx={{
                borderRadius: 1,
                marginBottom: 1,
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                },
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
        sx={{
          height: "100%",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
            borderBottom: "1px solid #ddd",
            paddingBottom: 1,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {selectedPage.title}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditToggle}
            sx={{ textTransform: "none" }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            backgroundColor: "white",
            borderRadius: 1,
            padding: 2,
            boxShadow: 1,
          }}
        >
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={15}
              variant="outlined"
              value={editedBodyText}
              onChange={(e) => setEditedBodyText(e.target.value)}
              sx={{ border: "1px solid #ddd", borderRadius: 1, padding: 1 }}
            />
          ) : (
            <ReactMarkdown>{selectedPage.bodyText}</ReactMarkdown>
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            marginTop: 2,
            borderTop: "1px solid #ddd",
            paddingTop: 1,
            textAlign: "right",
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ textTransform: "none" }}
            onClick={() => {
              const jsonBlob = new Blob(
                [JSON.stringify({ Pages: data }, null, 2)],
                { type: "application/json" }
              );
              const url = URL.createObjectURL(jsonBlob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "exported_data.json";
              link.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainWindow;
