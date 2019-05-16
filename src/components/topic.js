import React, { useState } from "react";

import { Badge, Tooltip } from "shards-react";
import { navigate } from "@reach/router";

const Topic = ({ placeTopic, setTopic, topic, description = topic }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <React.Fragment>
      <Badge id={`${topic.replace(/\s/g, "-")}`} theme="primary">
        <div
          className="link"
          onClick={e => {
            if (setTopic && placeTopic) {
              setTopic(e.target.innerText);
              placeTopic(e.target.innerText);
            } else {
              navigate(`/topics/${topic}`);
            }
          }}
        >
          {topic}
        </div>
      </Badge>
      <Tooltip
        open={toggle}
        target={`#${topic.replace(/\s/g, "-")}`}
        toggle={() => {
          setToggle(!toggle);
        }}
      >
        {description}
      </Tooltip>
    </React.Fragment>
  );
};
export default Topic;
