import React, { Component } from 'react'
import dummyImage from './../news.jpg'
export class NewsItem extends Component {
  render() {
    let {title, description, urlToImage, url} = this.props;
    return (
      <div className="col-md-3 my-2 border" style={{ width: "18rem" }}>
        <img src={urlToImage?urlToImage:dummyImage} className="card-img-top" alt="image-not-found" />
        <div className="card-body">
          <h5 className="card-title">{title ?title.slice(0,47)+'...' : ''}</h5>
          <p className="card-text">{description ? description.slice(0,97)+'...' : ''}</p>
          <a href={url} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">More Info.</a>
        </div>
      </div>
    );
  }
}

export default NewsItem;