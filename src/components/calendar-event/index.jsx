import React from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import EventJsonLd from "./event-json-ld";
import injectSheet from "react-jss";
import styles from "./styles";

dayjs.extend(advancedFormat);

const Event = ({
  summary,
  creator,
  description,
  location,
  start,
  end,
  classes,
  htmlLink
}) => {
  const formattedStartDate = start ? dayjs(start.dateTime).format("MMMM Do") : "";
  const emailSubject = `${formattedStartDate} ${summary}`;

  return (
    <div className={classes.root} itemScope itemType="http://schema.org/Event">
      <EventJsonLd {...{ summary, description, start, end, location }} />
      <meta itemProp="startDate" content={start.dateTime} />
      <div>
        <div className={classes.date}>
          <strong>{dayjs(start.dateTime).format("dddd")}</strong>
          , {formattedStartDate}
        </div>
        <div className={classes.timespan}>
          {dayjs(start.dateTime).format("h:mm A")} - {dayjs(end.dateTime).format("h:mm A")}
        </div>
      </div>
      <a href={htmlLink} className={classes.nameLink}>
        <h4 itemProp="name" className={classes.name}>
          {summary}
        </h4>
      </a>
      <a
        className={classes.link}
        href={`mailto:${creator.email}?subject=${encodeURIComponent(
          emailSubject
        )}`}
      >
        ✉ Contact organizer
      </a>
      <a
        className={classes.locationLink}
        href={`https://google.com/maps/search/${encodeURIComponent(location)}`}
      >
        <div className={classes.location}>{location}</div>
      </a>
      <p
        itemProp="description"
        className={classes.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default injectSheet(styles)(Event);
