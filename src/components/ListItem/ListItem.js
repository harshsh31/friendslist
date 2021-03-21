import { get } from "lodash-es";
import React, { Component } from "react";
import Tooltip from "../Tooltip/Tooltip";
import "./ListItem.css";

export default class ListItem extends Component {
  render() {
    const { data, changeFav, deleteItem } = this.props;
    return (
      <div className="listItem">
        <div className="listHeader">
          <div className="listName">{get(data, "name", "")}</div>
          <div className="placeHolderText">is Your Friend</div>
        </div>
        <div className="listActions">
          <div
            className="favIcon icon"
            onClick={() => changeFav(get(data, "name", ""))}
          >
            <Tooltip
              message={`${
                get(data, "isFavorite", false) ? "Remove From" : "Set As"
              } Favorite`}
              position={"left"}
            >
              <i
                className={
                  get(data, "isFavorite", false) ? "fa fa-star" : "far fa-star"
                }
                aria-hidden="true"
              ></i>
            </Tooltip>
          </div>
          <div
            className="deleteIcon icon"
            onClick={() => deleteItem(get(data, "name", ""))}
          >
            <Tooltip message={`Delete from Friend's List`} position={"left"}>
              <i className="fas fa-trash-alt"></i>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
