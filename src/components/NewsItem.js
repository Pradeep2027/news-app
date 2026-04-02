import React, { Component } from 'react'
import dummyImage from './../news.jpg'
export class NewsItem extends Component {
  render() {
    let {title, description, urlToImage, url, author, date, source} = this.props;
    return (
      <div className="col-md-4 my-2 border">
        <div className="card">
          <span className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-info z-1">{source}</span>
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