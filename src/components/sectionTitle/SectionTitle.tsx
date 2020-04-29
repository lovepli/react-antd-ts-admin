import React from "react";
import "./style.less";

interface IProps {
  name?: string;
}

const SectionTitle: React.SFC<IProps> = (props) => (
  <div className="section-title">
    <span className="section-title__tag" />
    <span className="section-title__name">{props.name || ""}</span>
  </div>
);

export default SectionTitle;
