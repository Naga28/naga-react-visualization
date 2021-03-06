import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

/* import { defaultExchanges, subscriptionExchange, useSubscription } from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws"; */

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2)
    },
    mcardDiv: {
        margin: theme.spacing(1)
    }
}));

/* const subscriptionClient = new SubscriptionClient(
    "ws://react.eogresources.com/graphql",
    {
        reconnect: true,
        timeout: 20000
    }
); */

const client = createClient({
    url: 'https://react.eogresources.com/graphql',
    /*  exchanges: [
        ...defaultExchanges,
        subscriptionExchange({
            forwardSubscription: operation => subscriptionClient.request(operation)
        })
    ] */
});

const LastKnownMeasurement = props => {
    const [measurement, setMeasurement] = React.useState([]);
    const classes = useStyles();
    const query = `
		query ($metricName: String!) {
		  getLastKnownMeasurement(metricName: $metricName) {
		    metric
		    value
		    unit
		    at
		  }
		}
		`;

        /* const querySubscription = `
        subscription ($metricName: String!) {
          getLastKnownMeasurement(metricName: $metricName) {
            metric
            value
            unit
            at
          }
        }
        `; */

    const dispatch = useDispatch();

    const [result, executeQuery] = useQuery({
        query,
        variables: {
            metricName: props.metricName
        }
    });

    const { data, error } = result;

    useEffect(() => {
        if (error) {
            dispatch({
                type: actions.API_ERROR,
                error: error.message
            });
            return;
        }
        if (!data) return;

        setMeasurement(data.getLastKnownMeasurement);
        const interval = setInterval(() => {
            executeQuery({ requestPolicy: "network-only" });
            setMeasurement(data.getLastKnownMeasurement);
        }, 1500);
        return () => clearInterval(interval);
    }, [dispatch, data, error, executeQuery]);

    /* const [res] = useSubscription({
        query: querySubscription,
         variables: {
            metricName: props.metricName
        }
    })
    
    console.log("======")
    console.log(res.data?.getLastKnownMeasurement)
    console.log("+++++"); */

    return ( 
        <div className={classes.mcardDiv}> 
            <Paper className = { classes.root }>
                <Typography variant = "h6" > { props.metricName } </Typography> 
                <Typography component = "p" > {props.metricName ? `Last Measurement: ${measurement.value} ${measurement.unit}` : null} 
                </Typography>
            </Paper> 
        </div>
    );
};

export default props => {
    return (
        <Provider value = { client }>
            < LastKnownMeasurement {...props }/>
        </Provider >
    );
};