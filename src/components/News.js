import React, { Component } from 'react'
import NewsItem from './NewsItem';

export class News extends Component {
  render() {
    return (
      <>
      <h2 className="mx-5 my-3">News Monkey - Top Headlines</h2>
        <div className="container my-3">
          <div className="row my-2">
            <NewsItem title="News Title1" description="description1"></NewsItem>
            <NewsItem title="News Title2" description="description2"></NewsItem>
            <NewsItem title="News Title3" description="description3"></NewsItem>
          </div>
          <div className="row my-2">
            <NewsItem title="News Title4" description="description4"></NewsItem>
            <NewsItem title="News Title5" description="description5"></NewsItem>
            <NewsItem title="News Title6" description="description6"></NewsItem>
          </div>
        </div>
      </>
    );
  }
}

export default News;