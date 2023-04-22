import { v4 as uuid } from 'uuid';

export const cleanAndTransformBlocks = (blocksJSON) => {
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
  const removeUnusedDataAndAssignId = (b) => {
    if (b) {
      b.forEach((block) => {
        block.id = uuid();
        deleteKeys.forEach(deleteKey => {
          delete block[deleteKey]
        })
        if (block.innerBlocks?.length) {
          removeUnusedDataAndAssignId(blocks.innerBlocks)
        } else {
          delete blocks.innerBlocks;
        }
      })
    }
  };
  removeUnusedDataAndAssignId(blocks);
  return blocks;
}