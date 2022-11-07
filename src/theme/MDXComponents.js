import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import DocCardList from '@theme/DocCardList';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  Docs: DocCardList,
};
