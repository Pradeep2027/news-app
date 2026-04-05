import React, { Component } from 'react'
import dummyImage from './../news.jpg'
export class NewsItem extends Component {
  render() {
    let {title, description, urlToImage, url, author, date, source} = this.props;
    return (
      <div className="col-md-4 col-sm-6 mb-2">
        <div className="card">
          <div className="d-flex justify-content-end position-absolute right-0">
            <span className="badge rounded-pill bg-info">{source}</span>
          </div>
          <img src={urlToImage?urlToImage:dummyImage} className="card-img-top" alt="image-not-found" />
          <div className="card-body">
            <h5 className="card-title">{title ?title.slice(0,47)+'...' : ''}</h5>
            <p className="card-text">{description ? description.slice(0,97)+'...' : ''}</p>
            <p className="card-text"><small className="text-muted">By {author?author:'Unknown'} on {new Date(date).toLocaleDateString()}</small></p>
            <a href={url} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">More Info.</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;