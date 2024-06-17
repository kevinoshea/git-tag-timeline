import React, { useEffect } from 'react';
import { DataSet } from 'vis-data';
import { Timeline as VisTimeline } from 'vis-timeline';

const Timeline = ({ data }) => {

  useEffect(() => {
    const applications = Object.keys(data); // [app 1, app 2, etc]

    const groups = applications.map(appName => (
      { id: applications.indexOf(appName), content: appName }
    ));

    let itemIndex = 1;
    const items = applications.flatMap(appName => {
      const group = applications.indexOf(appName);
      return data[appName].map((applicationTagItem) => {
        const id = itemIndex++;
        const content = applicationTagItem.tagName;
        const title = new Date(applicationTagItem.date).toDateString();
        const start = applicationTagItem.date;
        return { id, group, content, title, start };
      });
    });

    var options = {
      stack: true,
      min: '2014-01-01',
      max: new Date(new Date().getFullYear()+2, 1, 1),
      start: '2023-01-01',
      end: '2023-12-31',
      selectable: false,
      orientation: 'top',
      // zoomKey: 'ctrlKey',
    };

    const container = document.getElementById("vis-container");
    new VisTimeline(container, new DataSet(items), new DataSet(groups), options);
  });

  return <div id="vis-container" style={{width: '100%', height:'100%'}}></div>
};

export default Timeline;