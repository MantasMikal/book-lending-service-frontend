import React from 'react';
import { PageHeader, Input } from 'antd';
import BlogGrid from './bloggrid';

const { Search } = Input;

function Home(props) {
  
  return (
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <Search placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={null}/>
          <PageHeader className="site-page-header"
            title="304CEM Blog"
            subTitle="Welcome to the demo blog."/>
        </div>  
        <BlogGrid />
      </div>
  );
}

export default Home;
