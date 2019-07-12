import React from "react";
import { Icon } from "antd";

import Basketball from "@/assets/icons/basketball.svg";
import Excel from "@/assets/icons/excel.svg";
import Ppt from "@/assets/icons/ppt.svg";
import Pdf from "@/assets/icons/pdf.svg";
import Word from "@/assets/icons/word.svg";
import Image from "@/assets/icons/image.svg";

const iconClass:React.CSSProperties={
  fontSize:'24px',
  marginRight:'10px'
}


const SvgIcon: React.SFC = () => {
  return (
    <div className="icon">
      <p>图标结合antd.icon和@svgr/webpack使用</p>
      <Icon component={Basketball} style={iconClass} />
      <Icon component={Excel} style={iconClass} />
      <Icon component={Ppt} style={iconClass} />
      <Icon component={Pdf} style={iconClass} />
      <Icon component={Word} style={iconClass} />
      <Icon component={Image} style={iconClass} />
    </div>
  );
};

export default SvgIcon;
