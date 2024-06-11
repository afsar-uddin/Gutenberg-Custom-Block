import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, RichText, BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';



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

