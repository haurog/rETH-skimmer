export default function CalculatedStats(props) {

  const gridSizes = {  // do it here so tailwind picks up the classes used.
    2: 'grid-cols-2',
    3: 'grid-cols-3'
  }

  const classDescription = "grid " + gridSizes[props.calculatedStats.length] + " text-center"

  // console.log("calculated stats props: ", props, " length: ", props.calculatedStats.length, classDescription);

  return (
    <div>
      <dl className={classDescription}>
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