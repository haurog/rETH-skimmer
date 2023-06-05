export default function CalculatedStats(props) {

  console.log("calculated stats props: ", props);

  return (
    <div>
      <dl className="grid grid-cols-3 text-center">
        {props.calculatedStats.map((stat) => (
          <div key={stat.id} className="flex flex-col">
            <dd className="text-sm">{stat.name}</dd>
            <dd className="text-sm tracking-tight">{stat.value.toPrecision(3)} {stat.unit}</dd>
            <dd className="text-sm tracking-tight">{stat.additional ? stat.additional : ''}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}