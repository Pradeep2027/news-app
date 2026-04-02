import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';


export class News extends Component {
  constructor(){
    super();
    this.state = {
        articles: [],
        loading: true,
        page: 1,
        totPages: 5,
        totResult: 30,
        lastPage: false
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=259c4da5249b4c06b998810aa7f54b98&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, loading: false, page: 1, totalResults: parsedData.totalResults});
  }

  handleNextClick = async () => {
    if (this.state.page < Math.ceil(this.state.totalResults/12)){
      this.setState({loading:true});
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=259c4da5249b4c06b998810aa7f54b98&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page+1,
        articles: parsedData.articles,
        loading: false,
        lastPage: this.state.page+1>=Math.ceil(this.state.totalResults/this.props.pageSize)
      })
    }
  }

  handlePrevClick = async () => {
    this.setState({loading:true});
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=259c4da5249b4c06b998810aa7f54b98&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page-1,
      loading: false,
      articles: parsedData.articles,
      lastPage: this.state.page-1>=Math.ceil(this.state.totalResults/this.props.pageSize)
    })
  }

  render() {
    return (
      <>
        <h2 className="text-center my-3">News Monkey - Top Headlines</h2>
        {this.state.loading ? <Spinner/> : null}
        {this.state.loading ? null : 
          <div className="container p-0">
            <div className="row my-2">
              {this.state.articles.map((a) => {
                return (
                  <NewsItem key={a.url} title={a.title} description={a.description} urlToImage={a.urlToImage} url={a.url}></NewsItem>
                );
              })}
            </div>
          </div>
        }
        <div className="container px-0 d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Prev</button>
          <button disabled={this.state.lastPage} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </>
    );
  }
}

export default News;