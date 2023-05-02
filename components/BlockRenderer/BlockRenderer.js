import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Praragraph";
import Image from "next/image";
import { theme } from "theme";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map(block => {
    switch (block.name) {
      case ('acf/ctabutton'): {
        return (
          <CallToActionButton
            key={block.id}
            buttonLabel={block.attributes.data.label}
            destination={block.attributes.data.destination || '/'}
            align={block.attributes.data.align}
          />
        )
      }
      case ('core/paragraph'): {
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
      case ("core/columns"): {
        return (
          <Columns
            key={block.id}
            isStackedOnMobile={block.attributes.isStackedOnMobile}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        )
      }
      case ("core/column"): {
        return (
          <Column
            key={block.id}
            width={block.attributes.width}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        )
      }
      case ('core/group'):
      case ('core/block'): {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />
      }
      case ('core/image'): {
        return (
          <Image
            key={block.id}
            src={block.attributes.url}
            width={block.attributes.originalWidth}
            height={block.attributes.originalHeight}
            alt={block.attributes.alt || ''}
          />
        )
      }
      case ("core/cover"): {
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        )
      }
      default: {
        console.log('unknown block', block);
        return null;
      }

    }
  })
}