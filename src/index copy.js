import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, Button, RichText, IconButton  } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
// import { createElement } from '@wordpress/element';
// import { IconButton } from '@wordpress/components';'

registerBlockType( 'my-custom/list-block', {
    apiVersion: 1,
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
        items: {
            type: 'array',
            default: [],
            source: 'query',
            selector: 'ul',
            query: {
                content: {
                    type: 'string',
                    source: 'html',
                    selector: 'li',
                },
            },
        },
    },
    edit( { attributes, setAttributes } ) {
        const { heading, content, items } = attributes;

        const onChangeHeading = (newHeading) => {
            setAttributes({heading: newHeading})
        }

        // const addItem = () => {
        //     const newItems = [...items, {content: ''}];
        //     setAttributes({items: newItems})
        // }

        // const updateItem = (content, index) => {
        //     const newItems = [...items];
        //     newItems[index].content = content;
        //     setAttributes({items: newItems})
        // }

        // const removeItem = (index) => {
        //     const newItems = items.filter((_,i) => i !== index);
        //     setAttributes({items: newItems})
        // }

        const addItem = () => {
            const newItems = [...items, { content: '' }];
            setAttributes({ items: newItems });
        };

        const updateItem = (content, index) => {
            const newItems = [...items];
            newItems[index].content = content;
            setAttributes({ items: newItems });
        };

        const removeItem = (index) => {
            const newItems = items.filter((_, i) => i !== index);
            setAttributes({ items: newItems });
        };

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
                {/* <div>
                    <ul>
                        {
                            items.map((item, index) => (
                                <li key={index}>
                                    <RichText
                                        tagName='li'
                                        value={item.content}
                                        onChange={(content) => updateItem(content, index)}
                                    />
                                    <IconButton
                                        icon="trash"
                                        label={__('Remove item', 'my-custom-block')}
                                        onClick={() => removeItem(index)}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                    <Button
                        // isSecondary
                        onClick={addItem}
                    >
                         {__('Add Item', 'my-custom-block')}
                        
                    </Button>
                </div> */}

                <div {...useBlockProps()}>
                    <ul>
                        {items.map((item, index) => (
                            <Fragment key={index}>
                                <li>
                                    <RichText
                                        tagName="span"
                                        value={item.content}
                                        onChange={(content) => updateItem(content, index)}
                                    />
                                    <IconButton
                                        icon="trash"
                                        label={__('Remove item', 'my-custom-block')}
                                        onClick={() => removeItem(index)}
                                    />
                                </li>
                            </Fragment>
                        ))}
                    </ul>
                    <Button
                        isSecondary
                        onClick={addItem}
                    >
                        {__('Add Item', 'my-custom-block')}
                    </Button>
                </div>
            </div>
        );
    },
    save( { attributes } ) {
        const { heading, content, items } = attributes;

        return (
            <div>
                <RichText.Content tagName="h1" value={heading} />

                <RichText.Content tagName="p" value={content} />

                {/* <ul>
                    {
                        items.map((item, index) => (
                            <li key={index}>
                                <RichText.Content tagName='li' value={item.content} />
                            </li>
                        ))
                    }
                </ul> */}

                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            <RichText.Content tagName="span" value={item.content} />
                        </li>
                    ))}
                </ul>

            </div>
        );
    },
} );
