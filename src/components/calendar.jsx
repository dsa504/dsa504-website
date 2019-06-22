import React, { useCallback, useState } from "react"
import SEO from "./seo"
import CalendarEvent from "./calendar-event"
import { red } from "./calendar-event/styles"
import { compact, get, uniq } from "lodash"

const Calendar = ({ error, isFetching, items, fullScreen }) => {
  const [filter, setFilter] = useState("")
  const handleSetFilter = useCallback(
    e => {
      setFilter(e.target.value)
    },
    [setFilter]
  )

  if (isFetching) return <div>Fetching events…</div>

  if (error || !items) return null

  const filterOptions = compact(
    uniq(items.map(e => get(e, "creator.email")))
  ).sort()

  const filteredItems = filter
    ? items.filter(e => get(e, "creator.email") === filter)
    : items

  return (
    <>
      <SEO title="Upcoming Events" />
      <div className="events-filter">
        <select onChange={handleSetFilter}>
          <option value="">Filter by committee or caucus…</option>
          {filterOptions.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <a
          style={{ color: red, marginLeft: "auto" }}
          href="https://calendar.google.com/calendar/embed?src=vv0uj9uhqrl6j6m0pugu90uo6c%40group.calendar.google.com&ctz=America%2FChicago"
        >
          Sync with your calendar
        </a>
      </div>
      {filteredItems.map(item => (
        <CalendarEvent key={item.id} {...item} {...{ fullScreen }} />
      ))}
    </>
  )
}

export default Calendar
