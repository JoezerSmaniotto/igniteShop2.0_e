import { Handbag } from 'phosphor-react'
import { ButtonHTMLAttributes } from 'react';
import { CartButtonContainer, Badge } from "./styles";
import { useCart } from '../../hooks/useCart';

// type CartButtonProps = ComponentProps<typeof CartButtonContainer>
interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  showBadge?: boolean
}

export function CartButton({showBadge, ...rest }: CartButtonProps) {
  const {cartItems} = useCart()
  console.log("cartItems: ", cartItems)
  return (
    <CartButtonContainer {...rest}>
      {(showBadge && cartItems?.length > 0) &&  <Badge>{cartItems?.length}</Badge> }
      <Handbag weight='bold' />
    </CartButtonContainer>
  )
}