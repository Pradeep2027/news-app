import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country:'us',
    pageSize:8,
    category:'',
    key:''
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    key: PropTypes.string
  }

  constructor(props){
    super(props);
    this.state = {
        articles: [],
        loading: true,
        page: 1,
        lastPage: false
    }
    this.props.setProgress(10);
    document.title = `News Monkey - ${this.props.category === '' ? 'Top Headlines' : (this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1))}`;
  }

  async updateNews(pageNo) {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}${this.props.category===''?'':'&category='+this.props.category}${this.props.query===''?'':'&q='+this.props.query}&apiKey=${this.props.apiKey}&page=${this.state.page+pageNo}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({articles: parsedData.articles, page: this.state.page+pageNo, totalResults: parsedData.totalResults });
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.setState({loading: true, page: 1});
    await this.updateNews(0);
    this.setState({loading: false});
  }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}${this.props.category===''?'':'&category='+this.props.category}${this.props.query===''?'':'&q='+this.props.query}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: this.state.articles.concat(parsedData.articles), lastPage: this.state.page+1>=Math.ceil(this.state.totalResults/this.props.pageSize), page: this.state.page+1});
  }

  // handleNextClick = async () => {
  //   this.setState({loading:true});
  //   await this.updateNews(+1);
  //   this.setState({
  //     page: this.state.page+1,
  //     loading: false,
  //     lastPage: this.state.page+1>=Math.ceil(this.state.totalResults/this.props.pageSize)
  //   })
  // }

  // handlePrevClick = async () => {
  //   this.setState({loading:true});
  //   await this.updateNews(-1);
  //   this.setState({
  //     page: this.state.page-1,
  //     loading: false,
  //     lastPage: this.state.page-1>=Math.ceil(this.state.totalResults/this.props.pageSize)
  //   })
  // }

  render() {
    return (
      <>
        <h2 className="text-center my-3">News Monkey - Top {this.props.query ? this.props.query : this.props.category} Headlines</h2>
        <div className="container px-0">
          {this.state.loading ? <Spinner/> : null}
          <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={!this.state.lastPage} loader={<Spinner />} style={{overflow: "visible"}}>
            <div className="row">
              {this.state.articles.map((a, i) => {
                return <NewsItem key={a.url} title={a.title} description={a.description} urlToImage={a.urlToImage} url={a.url} author={a.author} date={a.publishedAt} source={a.source.name}></NewsItem>
              })}
            </div>
          </InfiniteScroll>
        </div>
        {/* <div className="container px-0 d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Prev</button>
          <button disabled={this.state.lastPage} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
  }
}

export default News;