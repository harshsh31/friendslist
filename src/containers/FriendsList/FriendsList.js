import { get, sortBy } from "lodash-es";
import React, { Component } from "react";
import ListItem from "../../components/ListItem/ListItem";
import Pagination from "../../components/Pagination/Pagination";
import ConfirmPrompt from "../../components/ConfirmPrompt/ConfirmPrompt";
import "./FriendsList.css";

export default class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        // {
        //   name: "Harsh Shah",
        //   isFavorite: false,
        // },
      ],
      page: 0,
      limit: 4,
      start: 0,
      searchTerm: "",
      deleteName: null,
      showDeletePopup: false,
    };
  }
  changeFav = (name) => {
    let listCopy = this.state.list.slice().map((lItem) => {
      if (get(lItem, "name", null) == name) {
        return {
          ...lItem,
          isFavorite: !get(lItem, "isFavorite", false),
        };
      } else return lItem;
    });
    this.setState({
      list: [
        ...sortBy([...listCopy.filter((l) => l.isFavorite == true)], "name"),
        ...sortBy([...listCopy.filter((l) => l.isFavorite == false)], "name"),
      ],
      searchTerm: "",
    });
  };
  createListItem = (name) => {
    const { list } = this.state;
    if (list.findIndex((i) => get(i, "name", "") == name) > -1) {
      alert(`Friend with name: ${name} already exists!`);
    } else {
      let listCopy = list.slice();
      listCopy.push({
        name,
        isFavorite: false,
      });
      this.setState({
        list: [...listCopy],
        searchTerm: "",
      });
      alert(`Friend with name: ${name} successfully created!`);
    }
  };
  handleKeyDown = (e) => {
    e.keyCode == 13
      ? this.createListItem(e.target.value)
      : this.setState({
          searchTerm: e.target.value,
          page: 0,
          limit: 4,
          start: 0,
        });
  };
  setPage = (page, start) => {
    this.setState({
      page,
      start,
    });
  };
  setLimit = (limit) => {
    this.setState({
      limit,
    });
  };
  deleteItem = (name) => {
    const { list } = this.state;
    this.setState({
      list: list.filter((l) => get(l, "name", "") != name),
      showDeletePopup: false,
      deleteName: null,
    });
  };
  setDeleteName = (name) => {
    this.setState({
      deleteName: name,
      showDeletePopup: true,
    });
  };
  render() {
    const {
      list,
      searchTerm,
      page,
      limit,
      start,
      deleteName,
      showDeletePopup,
    } = this.state;
    const {
      changeFav,
      handleKeyDown,
      setPage,
      setLimit,
      deleteItem,
      setDeleteName,
    } = this;
    const data = list.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    let displayData = data.slice(start, start + limit);
    return (
      <div className="friendsListWrapper">
        <div className="title">Friends List</div>
        <div className="body">
          <div className={"searchContainer"}>
            <input
              autoFocus={true}
              type="text"
              placeholder="Enter your friend's name"
              value={searchTerm || ""}
              onChange={handleKeyDown}
              onKeyDown={handleKeyDown}
            />
            <div className={"icon"}>
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
          </div>
          <div
            className={`listWrapper ${
              list.length == 0 || displayData.length == 0 ? "resetHeight" : ""
            }`}
          >
            {list.length == 0 ? (
              <div className="noData">
                <div className="text"> Add friends in your list!</div>
              </div>
            ) : displayData.length == 0 ? (
              <div className="noData">
                <div className="text" title={searchTerm}>
                  No friends found with this search {searchTerm}
                </div>
              </div>
            ) : (
              displayData.map((item) => (
                <ListItem
                  key={item.name}
                  data={item}
                  changeFav={changeFav}
                  deleteItem={setDeleteName}
                />
              ))
            )}
          </div>
        </div>
        {!(list.length == 0 || displayData.length == 0) && (
          <Pagination
            pageSize={limit}
            onPageChange={(page) => {
              setPage(page, page * limit);
            }}
            page={page}
            canNext={(page + 1) * limit < data.length}
            canPrevious={page > 0}
            pages={Math.ceil(data.length / limit)}
          />
        )}
        {showDeletePopup && (
          <div className={"confirmPopupOverlay"}>
            <ConfirmPrompt
              title={"Confirm Delete Friend"}
              message={`Are you sure you want to delete ${deleteName} from your friend's list?`}
              yesBtnText={"Delete"}
              noBtnText={"Cancel"}
              onClose={() =>
                this.setState({
                  showDeletePopup: false,
                  deleteName: null,
                })
              }
              onYesClick={async () => {
                deleteItem(deleteName);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
