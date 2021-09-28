
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

const trafficShares = [
    { id: 1, label: "Karachi", value: 10, color: "primary", icon: faMapPin },
    { id: 2, label: "Lahore", value: 30, color: "secondary", icon: faMapPin },
    { id: 3, label: "Islamabad", value: 60, color: "tertiary", icon: faMapPin }
];

const totalOrders = [
    { id: 1, label: "July", value: [1, 5, 2, 5, 4, 3], color: "primary" },
    { id: 2, label: "August", value: [2, 3, 4, 8, 1, 2], color: "secondary" }
];

export {
    trafficShares,
    totalOrders
};