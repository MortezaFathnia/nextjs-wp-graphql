import { gql } from '@apollo/client';
import client from 'client';
import { v4 as uuid } from 'uuid';

export const cleanAndTransformBlocks = async (blocksJSON) => {
  const { data } = await client.query({
    query: gql`
    query AllPages {
      pages {
        nodes{
          uri
          databaseId
        }
      }
    }
    `
  })
  const blocks = JSON.parse(blocksJSON);
  const deleteKeys = [
    'attributesType',
    'blockType',
    'dynamicContent',
    'originalContent',
    'saveContent',
    'postId',
    'get_parent',
    'order'
  ];
  const cleanBlocks = (b) => {
    if (b) {
      b.forEach((block) => {
        block.id = uuid();
        deleteKeys.forEach(deleteKey => {
          delete block[deleteKey]
        })
        if (block.name === 'acf/ctabutton') {
          const associatedPage = data.pages.nodes.find(page => page.databaseId === block.attributes.data.destination);
          if (associatedPage) {
            block.attributes.data.destination = associatedPage.uri;
          }
        }
        if (block.innerBlocks?.length) {
          cleanBlocks(block.innerBlocks)
        } else {
          delete blocks.innerBlocks;
        }
      })
    }
  };
  cleanBlocks(blocks);
  return blocks;
}