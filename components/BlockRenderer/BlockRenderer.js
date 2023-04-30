import { CallToActionButton } from "components/CallToActionButton";
import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Praragraph";
import { theme } from "theme";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map(block => {
    switch (block.name) {
      case('acf/ctabutton'):{
        return(
          <CallToActionButton 
          key={block.id} 
          buttonLabel={block.attributes.data.label} 
          destination={block.attributes.data.destination || '/'} 
          align={block.attributes.data.align}
          />
        )
      }
      case('core/paragraph'):{
        return (
        <Paragraph 
          key={block.id}
          textAlign={block.attributes.align}
          content={block.attributes.content}
          textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text}
        />
        )
      }
      case ("core/heading"): {
        return (
          <Heading
            key={block.id}
            content={block.attributes.content}
            level={block.attributes.level}
            textAlign={block.attributes.textAlign}
          />)
      }
      case ("core/cover"): {
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        )
      }
      default:{
        console.log('unknown block',block);
        return null;
      }
        
    }
  })
}