import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, urlToImage, url} = this.props;
    return (
      <div className="col-md-4 m-2 border" style={{ width: "18rem" }}>
        <img src={urlToImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={url} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">More Info.</a>
        </div>
      </div>
    );
  }
}

export default NewsItem;