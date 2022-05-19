// RichTextEditor.js
import { FaPaperclip } from 'react-icons/fa'
import ExternalLinkRenderer from './components/ExternalLinkRenderer'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      lists: [{ title: 'Bullet', value: 'bullet' }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'link',
            blockEditor: {
              render: ExternalLinkRenderer
            },
            fields: [
              {
                name: 'url',
                type: 'url'
              }
            ]
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            blockEditor: {
              icon: FaPaperclip
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'post' }
                  // other types you may want to link to
                ]
              }
            ]
          }
        ]
      },
    }
  ],
}
