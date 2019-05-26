export const blk = "#222";
export const red = "#ec1f27";

const styles = {
  root: {
    background: "#fff",
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 16
  },
  link: {
    color: blk,
    "&:hover, &:focus": {
      color: red
    }
  },
  name: {
    margin: 0,
    padding: 0,
    clear: "left",
    fontSize: ({ fullScreen }) => (fullScreen ? 24 : 18),
    lineHeight: ({ fullScreen }) => (fullScreen ? "24px" : "18px")
  },
  nameLink: {
    composes: "$link"
  },
  description: {
    margin: 0,
    padding: 0,
    paddingTop: 10
  },
  date: {
    fontSize: ({ fullScreen }) => (fullScreen ? 22 : 16),
    lineHeight: ({ fullScreen }) => (fullScreen ? "24px" : "18px"),
    color: red,
    float: ({ fullScreen }) => (fullScreen ? "left" : "none")
  },
  timespan: {
    fontSize: ({ fullScreen }) => (fullScreen ? 18 : 13),
    color: "#797979",
    float: ({ fullScreen }) => (fullScreen ? "right" : "none")
  },
  location: {
    fontStyle: "italic"
  },
  locationLink: {
    composes: "$link"
  }
};

export default styles;
