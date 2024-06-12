import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, RichText, BlockControls, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';





// title and paragaraph
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

// image card
registerBlockType( 'my-custom/card', {
    title: 'IC Card',
    icon: 'format-image',
    category: 'text',
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: 'p'
        },
        imageUrl: {
            type: 'string',
            default: null,
        },
        imageAlt: {
            type: 'string',
            default: '',
        }
    },

    edit({attributes, setAttributes}) {
        const {content, imageUrl, imageAlt} = attributes;
        const [isEditingImage, setIsEditingImage] = useState(false);

        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageAlt: media.alt,
            });
        };

        return (
            <>
                <BlockControls>
                    <MediaUpload
                        onSelect={onSelectImage}
                        allowedTypes={['image']}
                        render={({open}) => (
                            <Button onClick={open} isPrimary>
                                {imageUrl ? 'Change Image' : 'Upload Image'}
                            </Button>
                        )}
                    />
                </BlockControls>
                {
                    imageUrl && (
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            onClick={() => setIsEditingImage(true)}
                            style={{cursor: 'pointer'}}
                        />
                    )
                }
                {
                    isEditingImage && (
                        <MediaUpload 
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={imageUrl}
                            render={({open}) => (
                                <Button onClick={open} isPrimary>
                                    Replace Image
                                </Button>
                            )}
                        />
                    )
                }
                <RichText 
                    tagName='p'
                    onChange={(newContent) => setAttributes({content: newContent})}
                    value={content}
                />
            </>
        );
    },

    save({attributes}) {
        const {content, imageUrl, imageAlt} = attributes;

        return(
            <div>
                {imageUrl && <img src={imageUrl} alt={imageAlt} />}
                <RichText.Content tagName='p' value={content} />
            </div>
        )
    }

} );

// const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph'];
// const TEMPLATE = [
//     ['core/heading', { placeholder: 'Enter heading...' }],
//     ['core/paragraph', { placeholder: 'Enter text...' }],
// ];

// accordion
registerBlockType('my-custom/accordion', {
    title: 'Ic Accordion',
    icon: 'list-view',
    category: 'common',
    attributes: {
        items: {
            type: 'array',
            default: [],
        },
        // imageUrl: {
        //     type: 'string',
        //     default: null,
        // },
        // imageAlt: {
        //     type: 'string',
        //     default: '',
        // }
    },
    edit({ attributes, setAttributes }) {
        const { items } = attributes;

        const addItem = () => {
            const newItems = [...items, { title: '', content: '', imageUrl: '', imageAlt: '' }];
            setAttributes({ items: newItems });
        };

        const removeItem = (index) => {
            const newItems = items.filter((item, i) => i !== index);
            setAttributes({ items: newItems });
        };

        const updateItem = (index, key, value) => {
            const newItems = items.map((item, i) => {
                if (i === index) {
                    return { ...item, [key]: value };
                }
                return item;
            });
            setAttributes({ items: newItems });
        };

        const onSelectImage = (index, media) => {
            const newItems = items.map((item, i) => {
                if (i === index) {
                    return { ...item, imageUrl: media.url, imageAlt: media.alt };
                }
                return item;
            });
            setAttributes({ items: newItems });
        };

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Accordion Settings">
                        <Button isPrimary onClick={addItem}>
                            Add Item
                        </Button>
                    </PanelBody>
                </InspectorControls>
                <div className="accordion-block">
                    {items.map((item, index) => (
                        
                        <div key={index} className="accordion-item">
                            <TextControl
                                label="Title"
                                value={item.title}
                                onChange={(value) => updateItem(index, 'title', value)}
                            />
                            <RichText
                                tagName="div"
                                value={item.content}
                                onChange={(value) => updateItem(index, 'content', value)}
                                placeholder="Add content..."
                            />
                            {console.log('items is now: ', item)}
                             <MediaUpload
                                onSelect={(media) => onSelectImage(index, media)}
                                allowedTypes={['image']}
                                render={({ open }) => (
                                    <Button onClick={open} isPrimary>
                                        {item.imageUrl ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                )}
                            />
                            {item.imageUrl && (
                                <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%' }} />
                            )}
                            <Button isDestructive onClick={() => removeItem(index)}>
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
            </Fragment>
        );
    },
    save({ attributes }) {
        const { items } = attributes;

        return (
            <div className="accordion-block">
                <div className="accordion" id="accordionExample">
                {items.map((item, index) => (
                    <div key={index} className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded={index === 0 ? true : false} aria-controls={`collapse${index}`}>
                                <RichText.Content tagName="h3" value={item.title} />
                            </button>
                        </h2>
                        <div id={`collapse${index}`} className={index === 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <RichText.Content tagName="div" value={item.content} />
                                <div className='accordion-image'>
                                    {item.imageUrl && (
                                        <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%' }} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                {/* {items.map((item, index) => (
                    <div key={index} className="accordion-item">
                        <div className="accordion-title">
                            <RichText.Content tagName="h3" value={item.title} />
                        </div>
                        <div className="accordion-content">
                            <RichText.Content tagName="div" value={item.content} />
                        </div>
                        <div className='accordion-image'>
                            {item.imageUrl && (
                                <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%' }} />
                            )}
                        </div>
                    </div>
                ))} */}
            </div>
        );
    },
});