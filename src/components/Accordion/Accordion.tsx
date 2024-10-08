import { PropsWithChildren, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface AccordionProps extends PropsWithChildren {
  label: string;
}

export const Accordion = ({ label, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen((v) => !v);
  };

  return (
    <div>
      <div
        data-testid="AccordionLabelWrapper"
        onClick={handleToggleOpen}
        className="flex justify-between hover:cursor-pointer hover:text-blue-500 font-semibold"
      >
        <p data-testid="AccordionLabel" className="text-sm">
          {label}
        </p>
        <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
      </div>
      {isOpen && (
        <div data-testid="AccordionContentContainer" className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};
