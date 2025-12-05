import React from 'react';
import Layout from '@theme/Layout';
import './style.css';
import MatrixCanvas from '../../components/MatrixCanvas';

export default function Chapter1() {
  return (
    <Layout title="Chapter 1">
       <MatrixCanvas opacity={0.12} />
      <div className="chapter-hero">
        <h1 className="chapter-text">
          CHAPTER
          <span className="num">1</span>
        </h1>
      </div>
    </Layout>
  );
}