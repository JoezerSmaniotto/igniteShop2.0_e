import { styled } from "@stitches/react";

export const CartButtonContainer = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: 6,
  position: 'relative',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },


  variants: {
    color: {
      green: {
        backgroundColor: '$green500',
        color: '$white',

        '&:not(:disabled):hover': {
          backgroundColor: '$green300',
        },
      },
      gray: {
        backgroundColor: '$gray800',
        color: '$gray500',

        '&:not(:disabled):hover': {
          backgroundColor: '$gray700',
        },
      }
    },
    size: {
      medium: {
        width: '3rem',
        height: '3rem',
        
        svg: {
          fontSize: 24,
        },
      },
      large: {
        width: '3.5rem',
        height: '3.5rem',
        
        svg: {
          fontSize: 32,
        },
      },
    },
  },

  defaultVariants: {
    color: 'gray',
    size: 'medium',
  }
})


export const Badge = styled('span', {
display: 'flex',
flexDirection: 'column',
justifyContent: 'center',
alignItems: 'center',
padding: 0,
gap: 8,

position: 'absolute',
width: 24,
height: 24,
right: -7,
top: -7,

/* Brand/Principal */

background: '#00875F',
/* Grayscale/Background */

border: '3px solid #121214',
borderRadius: 1000,

/* Inside auto layout */

flex: 'none',
order: 1,
flexGrow: 0,
zIndex: 1,
})