import React, { Component } from "react";
import { render } from "react-dom";

import AsyncImage from "async-image/AsyncImage";
import "./async-image.css";

/**
 * App
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class App extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={"container p-5"}>
        <h1 className={"display-4"}>
          Async Image <small className={"font-weight-light text-muted"}>: example page</small>
        </h1>
        <div className={"row"}>
          <div className={"col-4"}>
            <AsyncImage
              src={"https://picsum.photos/1920/1920"}
              placeholderImage={"https://picsum.photos/32/24"}/>
          </div>
          <div className={"col-4"}>
            <AsyncImage src={"https://picsum.photos/1920/1600"}
              placeholderImage={"https://picsum.photos/16/12"}/>
          </div>
          <div className={"col-4"}>
            <AsyncImage src={"https://picsum.photos/1024/768"}
              placeholderImage={"https://picsum.photos/64/24"}/>
          </div>
        </div>
      </div>
    );
  }
}

render(
  <App/>,
  document.getElementById("root")
);
