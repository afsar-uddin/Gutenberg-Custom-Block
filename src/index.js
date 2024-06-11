import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';



registerBlockType( 'my-custom/block', {
    title: 'My Custom Block',
    icon: 'smiley',
    category: 'common',
    attributes: {
        heading: {
            type: 'string',
            source: 'html',
            selector: 'h1',
        },
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
    },
    edit( { attributes, setAttributes } ) {
        const { heading, content } = attributes;

        const onChangeHeading = (newHeading) => {
            setAttributes({heading: newHeading})
        }

        return (
            <div>
                <RichText
                    tagName='h1'
                    placeholder='Enter heading'
                    value= {heading}
                    onChange={onChangeHeading}
                />
                <RichText
                    tagName="p"
                    placeholder='Enter your paragraph'
                    onChange={(newContent) => setAttributes({ content: newContent })}
                    value={content}
                />
            </div>
        );
    },
    save( { attributes } ) {
        const { heading, content } = attributes;

        return (
            <div>
                <RichText.Content tagName="h1" value={heading} />

                <RichText.Content tagName="p" value={content} />
            </div>
        );
    },
} );

