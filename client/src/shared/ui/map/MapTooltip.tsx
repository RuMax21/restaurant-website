interface MapTooltipProps {
    title: string;
    description: string;
}

const MapTooltip = ({ title, description }: MapTooltipProps) => (
    <div className="p-2.5">
        <h3 className="text-gray-800 text-base font-semibold mb-1.5">
            {title}
        </h3>
        <p className="text-gray-600 text-sm m-0">{description}</p>
    </div>
);

export default MapTooltip;
