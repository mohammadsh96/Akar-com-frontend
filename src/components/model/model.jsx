import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function PopoverPositionedExample() {
const placement ="top" ;
  return (
    <>
      
        <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`popover-positioned-${placement}`}>
              <Popover.Header as="h3">Are You sure !</Popover.Header>
              <Popover.Body>
                  <Button variant="danger">Confirm</Button>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="success">Submit</Button>
        </OverlayTrigger>
     
    </>
  );
}

export default PopoverPositionedExample;