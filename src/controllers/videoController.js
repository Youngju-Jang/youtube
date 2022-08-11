export const trending = (req, res) => res.send("home page Videos");
export const see = (req, res) => {
  console.log(req.params);
  return res.send(`watch video #${req.params.id}`);
};
export const edit = (req, res) => {
  console.log(req.params);
  return res.send("edit");
};
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("upload");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("Delete Video");
};
