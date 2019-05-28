import React from "react";
import Layout from "../../components/layout";

const EventDetail = ({ pageContext: { summary } }) => {
    return <Layout><h1>{summary}</h1></Layout>;
}

export default EventDetail;