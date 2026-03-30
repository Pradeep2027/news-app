import React, { Component } from 'react'
import NewsItem from './NewsItem';
import output from '../sampleOutput.json'

export class News extends Component {
  constructor(){
    super();
    this.state = {
        articles: output.articles
    }
  }
  render() {
    return (
      <>
      <h2 className="mx-5 my-3">News Monkey - Top Headlines</h2>
        <div className="container my-3">
          <div className="row my-2">
            {this.state.articles.filter(a=>a.title && a.description).map((a)=>{
                return <NewsItem key={a.url} title={a.title.slice(0,47)+'...'} description={a.description.slice(0,97)+'...'} urlToImage={a.urlToImage} url={a.url}></NewsItem>
            })}
          </div>
        </div>
      </>
    );
  }
}

export default News;